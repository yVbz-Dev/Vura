package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

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
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) SelectFolder() string {
	// Open file dialog 
	path, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Choose the folder",
		Filters : []runtime.FileFilter{
			{
				DisplayName: "Select a file (.txt, .go, .py)",
				Pattern:     "*.go;*.py;*.js;*.ts;*.e;*.c;*.cpp;*.jsx;*.tsx;*.cs;",
			},
		},
	})

	if err != nil {
		return ""
	}
	fmt.Println(path)
	return path
}
