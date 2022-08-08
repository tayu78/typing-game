package main

import (
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-lambda-go/events"
)

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error){
	symbol := returnSymbol()

	headers := map[string]string{
		"Content-Type":                    "application/json",
		"Access-Control-Allow-Origin":     request.Headers["origin"], 
		"Access-Control-Allow-Methods":    "OPTIONS,POST,GET",
		"Access-Control-Allow-Headers":    "Origin,Authorization,Accept,X-Requested-With",
		"Access-Control-Allow-Credential": "true",
}

	return events.APIGatewayProxyResponse{
		Headers:    headers,
		Body:     fmt.Sprintf("%v", symbol),
		StatusCode: 200,
}, nil

}

func returnSymbol()string {
	symbolList := "1 2 3 4 5 6 7 8 9 0 ! # $ % ' ( ) = ~ | - ^ ` @ { } [ ] + ; * : , . / ?"
	return symbolList
}

func main() {
	lambda.Start(Handler)
}