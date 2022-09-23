package main

import (
	"html/template"
	"log"
	"net/http"
	"path"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmp, err := template.ParseFiles(path.Join("templates", "index.html"))
		if err != nil {
			log.Println(err)
			return
		}
		if err := tmp.Execute(w, map[string]string{
			"title": "Hack",
			"name":  "Pranjal",
		}); err != nil {
			log.Println(err)
			return
		}
	})
	log.Fatalln(http.ListenAndServe(":8000", nil))
}
