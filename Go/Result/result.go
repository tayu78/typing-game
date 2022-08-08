package main

import (
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	"math"
	"strings"
	"strconv"
)

type MyEvent struct {
	ElappsedTime string `json:"ElappsedTime"`
	QuestionNumber string`json:"QuestionNumber"`
	IncorrectNumber string `json:"IncorrectNumber"`
}

type MyResponse struct {
	AverageKeyNumber string `json:"AverageKeyNumber"`
	CorrectRate string `json:"CorrectRate"`
}

func round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}

func toFixed(num float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(round(num * output)) / output
}

func getAverage(time string ) float64 {
	var t float64
	t, _ = strconv.ParseFloat(time, 64)
	return toFixed((10 / t), 1)
}

func getCorrectRate(questionNumber string , incorrectNumber string) float64 {
	var qn float64
	var in float64
	qn, _ = strconv.ParseFloat(questionNumber, 64)
	in, _ = strconv.ParseFloat(incorrectNumber, 64)
	return toFixed(math.Floor((100 * qn) / (qn + in)),0)

}

func Handler(event MyEvent) (MyResponse, error){
	average := getAverage(event.ElappsedTime)
	correctRate := getCorrectRate(event.QuestionNumber, event.IncorrectNumber)
	return MyResponse{
		AverageKeyNumber:  strings.TrimRight(strings.TrimRight( fmt.Sprintf("%.2f",average), "0"), "."),
		CorrectRate: strings.TrimRight(strings.TrimRight( fmt.Sprintf("%.2f",correctRate), "0"), "."),
	}, nil
}



func main() {
	lambda.Start(Handler)
}