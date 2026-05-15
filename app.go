package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"log"
	"os"
	"path/filepath"
)

var ConfigDir, _ = os.UserConfigDir()
var VuraConfigDir = filepath.Join(ConfigDir, "vura")
var VuraConfigFile = filepath.Join(VuraConfigDir, "vuraConfig.json")

type FileData struct {
	Name    string
	Content string
	Path    string
}

type Config struct {
	VimMode bool `json:VimMode`
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// Init notifs
	err := runtime.InitializeNotifications(ctx)
	if err != nil {
		log.Fatal(err)
	}

	// mkdir config dir
	err = os.MkdirAll(VuraConfigDir, 0755)
	if err != nil {
		fmt.Println("Err creating config dir")
		return
	}

	// mkdir config.json
	configJsonDir := filepath.Join(VuraConfigDir, "vuraConfig.json")
	_, file := os.Stat(configJsonDir)
	if file != nil && os.IsNotExist(file) {
		// create file, it does not exist!
		os.Create(VuraConfigFile)
		jsonConverted, err := json.MarshalIndent(getDefaultConfig(), "", "  ")
		if err != nil {
			os.WriteFile(VuraConfigFile, []byte(""), 0644)
		} else {
			os.WriteFile(VuraConfigFile, jsonConverted, 0644)
		}
	}
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) SelectFolder() FileData {
	// Open file dialog
	path, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Choose the folder",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Select a file (.txt, .go, .py)",
				Pattern:     "*.go;*.py;*.lua;*.js;*.ts;*.e;*.c;*.cpp;*.jsx;*.tsx;*.cs;",
			},
		},
	})

	if err != nil {
		return FileData{}
	}

	// get file content
	content, error := os.ReadFile(path)
	if error != nil {
		return FileData{}
	}
	return FileData{
		Name:    filepath.Base(path),
		Content: string(content),
		Path:    path,
	}
}

func (a *App) SaveFile(data FileData) error {
	err := os.WriteFile(data.Path, []byte(data.Content), 0644)
	fmt.Println(err, data.Path, data.Content)
	if err != nil {
		return err
	}
	return nil
}

func (a *App) GetConfig() Config {
	fileContent, err := os.ReadFile(VuraConfigFile)
	if err != nil {
		return getDefaultConfig()
	}
	fmt.Println(string(fileContent))
	var parsedFileContent Config
	json.Unmarshal(fileContent, &parsedFileContent)
	fmt.Println(parsedFileContent)
	return parsedFileContent
}

func getDefaultConfig() Config {
	return Config{
		VimMode: false,
	}
}
