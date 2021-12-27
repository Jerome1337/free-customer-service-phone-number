package main

import (
	"encoding/csv"
	"encoding/json"
	"errors"
	"log"
	"os"
	"strconv"
)

type Number struct {
	Number                int    `json:"number"`
	AdditionalInformation string `json:"additional_information,omitempty"`
}

type Service struct {
	Name              string   `json:"name"`
	ChargeableNumbers []Number `json:"chargeable_numbers"`
	FreeNumbers       []Number `json:"free_numbers"`
}

func transformPhoneNumberToInt(phoneNumber string) int {
	number, err := strconv.Atoi(phoneNumber)

	if err != nil {
		return 0
	}

	return number
}

func formatServicesNumbers(data [][]string) []Service {
	var services []Service
	var previousName string

	for i, line := range data {
		if i == 0 {
			continue
		}

		var service Service
		var chargeableNumbers, freeNumbers []Number
		var chargeableNumber, freeNumber Number

		isSameName := false
		isChargeableNumberEmpty := true

		for j, field := range line {
			if j == 0 {
				service.Name = field

				if previousName == field {
					isSameName = true
					service = services[len(services)-1]

					chargeableNumbers = service.ChargeableNumbers
					freeNumbers = service.FreeNumbers
				}

				previousName = field
			} else if j == 1 {
				chargeableFormattedNumber := transformPhoneNumberToInt(field)

				if chargeableFormattedNumber != 0 {
					isChargeableNumberEmpty = false
					chargeableNumber.Number = chargeableFormattedNumber
				}
			} else if j == 2 {
				freeNumber.Number = transformPhoneNumberToInt(field)
			} else if j == 3 {
				freeNumber.AdditionalInformation = field
			}
		}

		if !isChargeableNumberEmpty {
			service.ChargeableNumbers = append(chargeableNumbers, chargeableNumber)
		}

		service.FreeNumbers = append(freeNumbers, freeNumber)

		if isSameName {
			services = services[:len(services)-1]
		}

		services = append(services, service)
	}

	return services
}

func main() {
	if len(os.Args) == 1 {
		log.Fatalln("File path not given")
	}

	filePath := os.Args[1]

	f, err := os.Open(filePath)
	if err != nil {
			log.Fatalf("Failed to %s", err.Error())
	}

	defer f.Close()

	csvReader := csv.NewReader(f)
	csvReader.Comma = ';'

	data, err := csvReader.ReadAll()
	if err != nil {
			log.Fatalln("Failed to read CSV file", err)
	}

	services := formatServicesNumbers(data)

	jsonData, err := json.MarshalIndent(services, "", "  ")
	if err != nil {
			log.Fatalln("Failed to marshal json value", err)
	}

	if _, err := os.Stat("./dist"); errors.Is(err, os.ErrNotExist) {
		os.Mkdir("./dist", os.ModePerm)
	}

	if err := os.WriteFile("./dist/formattedData.json", jsonData, 0777); err != nil {
		log.Fatalf("Failed to %s", err.Error())
	}

	log.Printf("Successfully formatted CSV file to JSON")
}
