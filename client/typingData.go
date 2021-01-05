package main

import (
	"fmt"
	"time"
	"math/rand"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-lambda-go/events"
)
// type Response struct {
// 	Data string `json:"data"`
// }
func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error){
	symbol := returnSymbol()

	headers := map[string]string{
		"Content-Type":                    "application/json",
		"Access-Control-Allow-Origin":     request.Headers["origin"], 
		"Access-Control-Allow-Methods":    "OPTIONS,POST,GET",
		"Access-Control-Allow-Headers":    "Origin,Authorization,Accept,X-Requested-With",
		"Access-Control-Allow-Credential": "true",
}
	// return Response {
	// 	Data:fmt.Sprintf("%s", symbol),
	// }, nil
	return events.APIGatewayProxyResponse{
		Headers:    headers,
		Body:     fmt.Sprintf("%s", symbol),
		StatusCode: 200,
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