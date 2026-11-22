package main

import "fmt"

type product struct {
	title       string
	price       int
	oldPrice    int
	stock       int
	isAvailable bool
}

func formatPrice(price int) string {
	return fmt.Sprintf("%d ₽", price)
}

func calculateDiscount(item product) int {
	if item.oldPrice <= item.price {
		return 0
	}

	return item.oldPrice - item.price
}

func getProductStatus(item product) string {
	if item.isAvailable && item.stock > 0 {
		return "В наличии"
	}

	return "Нет в наличии"
}

func createProductSummary(item product) string {
	return fmt.Sprintf("%s — %s. %s.", item.title, formatPrice(item.price), getProductStatus(item))
}

func main() {
	lamp := product{
		title:       "Лампа Aurora Desk",
		price:       6490,
		oldPrice:    7690,
		stock:       12,
		isAvailable: true,
	}

	fmt.Println("Практика №15 (Go)")
	fmt.Println("Цена:", formatPrice(lamp.price))
	fmt.Println("Скидка:", formatPrice(calculateDiscount(lamp)))
	fmt.Println("Статус:", getProductStatus(lamp))
	fmt.Println("Описание:", createProductSummary(lamp))
}
