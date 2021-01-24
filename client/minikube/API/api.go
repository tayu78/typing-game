package main

import (
	"fmt"
	"math"
	"strings"
	"strconv"
	"net/http"
	"github.com/labstack/echo/v4"
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


func returnSymbol()string {
	symbolList := "1 2 3 4 5 6 7 8 9 0 ! # $ % ' ( ) = ~ | - ^ ` @ { } [ ] + ; * : , . / ?"
	return symbolList
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

func initRouting(e *echo.Echo){
	e.GET("/symbol",getSymbol)
	e.GET("/result", getResult)
}

func getSymbol(c echo.Context) error {
	symbols := returnSymbol()
	
   return c.JSON(http.StatusOK, map[string]string{"symbols": symbols})

}

func getResult(c echo.Context) error {
	average := getAverage(c.QueryParam("ElappsedTime")) 
	correctRate := getCorrectRate(c.QueryParam("QuestionNumber"),c.QueryParam("IncorrectNumber"))
	return  c.JSON(http.StatusOK, map[string]string{"AverageKeyNumber":  strings.TrimRight(strings.TrimRight( fmt.Sprintf("%.2f",average), "0"), "."),	"CorrectRate": strings.TrimRight(strings.TrimRight( fmt.Sprintf("%.2f",correctRate), "0"), ".")})
}

func main(){
	e := echo.New()

	initRouting(e)

	e.Logger.Fatal(e.Start(":4000"))
}
//http://127.0.0.1:4000/result?ElappsedTime=18.36&QuestionNumber=10&IncorrectNumber=5