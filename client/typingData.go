package main

import (
	"fmt"
	"time"
	"math/rand"
	"github.com/aws/aws-lambda-go/lambda"
)

type Response struct {
	Data string `json:"data"`
}
func Handler() (Response, error){
	symbol := returnSymbol()
	return Response {
		Data:fmt.Sprintf("%s", symbol),
	}, nil

}

func returnSymbol() string {
	symbolList := []string{
		"1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
		"!", "#", "$", "%", "&", "'", "(", ")", "=", "~", "|", "-", "^", "`", "@", "{", "}", "[", "]",
	"+",";","*",":", ",",".", "<", ">", "?", "/", "_" ,"_",
	}
	rand.Seed(time.Now().UnixNano())
	fmt.Println(symbolList[rand.Intn(len(symbolList))])
	return symbolList[rand.Intn(len(symbolList))]
}

func main() {
	lambda.Start(Handler)
}