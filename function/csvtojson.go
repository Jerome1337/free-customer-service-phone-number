package function

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

// Number represent a chargeable or free phone number with its additional information
type Number struct {
	Number                int    `json:"number"`
	AdditionalInformation string `json:"additional_information,omitempty"`
}

// Service represent a company service with all the chargeable and free phone numbers
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

// FormatJSON gets the CSV file from GitHub then return a the JSON representation byte slice
func FormatJSON() ([]byte, error) {
	response, err := http.Get("https://raw.githubusercontent.com/Jerome1337/free-customer-service-phone-number/main/data-files/phones-numbers.csv")
	if err != nil {
		return nil, fmt.Errorf("Failed to get CSV file", err)
	}

	defer response.Body.Close()

	csvReader := csv.NewReader(response.Body)
	csvReader.Comma = ';'

	data, err := csvReader.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("Failed to read CSV content", err)
	}

	services := formatServicesNumbers(data)

	jsonData, err := json.Marshal(services)
	if err != nil {
		return nil, fmt.Errorf("Failed to marshal json value", err)
	}

	return jsonData, nil
}
