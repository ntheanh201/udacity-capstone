package main

import "fmt"

func returnInt() int {
	return 1
}

func main() {
	fmt.Println("Hello, world.")

	fmt.Println("lint: ", returnInt())
}
