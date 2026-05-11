package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type FileData struct {
	Name    string
	Content string
	Path    string
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
	err := runtime.InitializeNotifications(ctx)
	if err != nil {
		log.Fatal(err)
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
				Pattern:     "*.go;*.py;*.js;*.ts;*.e;*.c;*.cpp;*.jsx;*.tsx;*.cs;",
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
	if err != nil {
		return err
	}
	return nil
}
