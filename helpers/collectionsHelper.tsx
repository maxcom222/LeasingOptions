class CollectionsHelper {
    public static rentalMonths() {
        return [
            { name: "1 Month", id: 1 },
            { name: "3 Months", id: 3 },
            { name: "6 Months", id: 6 },
            { name: "9 Months", id: 9 },
            { name: "12 Months", id: 12 }
        ];
    }

    public static terms() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "2 Years", id: 2 },
            { name: "3 Years", id: 3 },
            { name: "4 Years", id: 4 }
        ];
    }

    public static mileages() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "5,000 Miles", id: 5000 },
            { name: "8,000 Miles", id: 8000 },
            { name: "10,000 Miles", id: 10000 },
            { name: "12,000 Miles", id: 12000 },
            { name: "15,000 Miles", id: 15000 },
            { name: "20,000 Miles", id: 20000 },
            { name: "30,000 Miles", id: 30000 }
        ];
    }

    public static vehicleStyles() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "Coupe", id: 1, type: 1 },
            { name: "Convertible", id: 3, type: 1 },
            { name: "Hatchback", id: 4, type: 1 },
            { name: "Saloon", id: 5, type: 1 },
            { name: "Estate", id: 6, type: 1 },
            { name: "SUV / Crossover", id: 7, type: 1 },
            { name: "MPV", id: 10, type: 1 },
            { name: "Sports Car", id: 11, type: 1 },
            { name: "Small", id: 14, type: 2 },
            { name: "Medium", id: 15, type: 2 },
            { name: "Large", id: 16, type: 2 },
            { name: "Pickup", id: 17, type: 2 },
            { name: "Crew", id: 18, type: 2 },
            { name: "Dropside", id: 19, type: 2 },
            { name: "Luton", id: 20, type: 2 }
        ];
    }

    public static vehicleSizes() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "Small", id: 1 },
            { name: "Medium", id: 2 },
            { name: "Large", id: 3 }
        ];
    }

    public static fuelTypes() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "Diesel", id: 2 },
            { name: "Petrol", id: 1 },
            { name: "Electric", id: 3 },
            { name: "Hybrid", id: 4 }
        ];
    }

    public static transmissions() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "Auto", id: 2 },
            { name: "Manual", id: 1 }
        ];
    }

    public static engineSizes() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "< 1 Litre", id: "0,998" },
            { name: "1 - 1.3 Litres", id: "998,1350" },
            { name: "1.4 - 1.6 Litres", id: "1350,1650" },
            { name: "1.7 - 1.9 Litres", id: "1650,1950" },
            { name: "2.0 - 2.5 Litres", id: "1950,2500" },
            { name: "2.5+ Litres", id: "2500,15000" }
        ];
    }

    public static driveTrains() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "Front Wheel Drive", id: "F" },
            { name: "Rear Wheel Drive", id: "R" },
            { name: "Four Wheel Drive", id: "4" }
        ];
    }

    public static co2s() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "<0", id: 0 },
            { name: "<50", id: 50 },
            { name: "<100", id: 100 },
            { name: "<150", id: 150 },
            { name: "<200", id: 200 },
            { name: "<250", id: 250 },
            { name: "<300", id: 300 }
        ];
    }

    public static mpgs() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "0+", id: "", isDefault: true },
            { name: "10+", id: 10 },
            { name: "20+", id: 20 },
            { name: "30+", id: 30 },
            { name: "40+", id: 40 },
            { name: "50+", id: 50 },
            { name: "60+", id: 60 },
            { name: "70+", id: 70 },
            { name: "80+", id: 80 },
            { name: "90+", id: 90 },
            { name: "100+", id: 100 }
        ];
    }

    public static prices() {
        return [
            { name: "Show me everything", id: "", isDefault: true },
            { name: "Up to £150", id: 150 },
            { name: "Up to £200", id: 200 },
            { name: "Up to £250", id: 250 },
            { name: "Up to £300", id: 300 },
            { name: "Up to £350", id: 350 },
            { name: "Up to £400", id: 400 },
            { name: "Up to £450", id: 450 },
            { name: "Up to £500", id: 500 },
            { name: "Up to £600", id: 600 },
            { name: "Up to £700", id: 700 },
            { name: "Up to £800", id: 800 },
            { name: "Up to £900", id: 900 },
            { name: "Up to £1000", id: 1000 },
            { name: "£1000+", id: 9999 }
        ];
    }

    public static seats() {
        return [
            { name: "Any", id: "", isDefault: true },
            { name: "1", id: 1 },
            { name: "2", id: 2 },
            { name: "3", id: 3 },
            { name: "4", id: 4 },
            { name: "5", id: 5 },
            { name: "6", id: 6 },
            { name: "7", id: 7 },
            { name: "8", id: 8 },
            { name: "9", id: 9 }
        ];
    }

    public static makes() {
        return [
            {
                "id": "abarth",
                "text": "Abarth",
                "vehicleType": [1]
            },
            {
                "id": "alfa-romeo",
                "text": "Alfa Romeo",
                "vehicleType": [1]
            },
            // {
            //     "id": "alpine",
            //     "text": "Alpine",
            //     "vehicleType": [1]
            // },
            {
                "id": "audi",
                "text": "Audi",
                "vehicleType": [1]
            },
            {
                "id": "bmw",
                "text": "BMW",
                "vehicleType": [1]
            },
            {
                "id": "citroen",
                "text": "Citroen",
                "vehicleType": [1, 2]
            },
            {
                "id": "cupra",
                "text": "Cupra",
                "vehicleType": [1]
            },
            {
                "id": "ds",
                "text": "DS",
                "vehicleType": [1]
            },
            {
                "id": "fiat",
                "text": "Fiat",
                "vehicleType": [1, 2]
            },
            {
                "id": "ford",
                "text": "Ford",
                "vehicleType": [1, 2]
            },
            {
                "id": "honda",
                "text": "Honda",
                "vehicleType": [1]
            },
            {
                "id": "hyundai",
                "text": "Hyundai",
                "vehicleType": [1]
            },
            {
                "id": "jaguar",
                "text": "Jaguar",
                "vehicleType": [1]
            },
            {
                "id": "jeep",
                "text": "Jeep",
                "vehicleType": [1]
            },
            {
                "id": "kia",
                "text": "KIA",
                "vehicleType": [1]
            },
            {
                "id": "land-rover",
                "text": "Land Rover",
                "vehicleType": [1]
            },
            {
                "id": "lexus",
                "text": "Lexus",
                "vehicleType": [1]
            },
            {
                "id": "maserati",
                "text": "Maserati",
                "vehicleType": [1]
            },
            {
                "id": "mazda",
                "text": "Mazda",
                "vehicleType": [1]
            },
            {
                "id": "mercedes-benz",
                "text": "Mercedes-Benz",
                "vehicleType": [1, 2]
            },
            {
                "id": "mg-motor-uk",
                "text": "MG Motor UK",
                "vehicleType": [1]
            },
            {
                "id": "mini",
                "text": "Mini",
                "vehicleType": [1]
            },
            {
                "id": "mitsubishi",
                "text": "Mitsubishi",
                "vehicleType": [1, 2]
            },
            {
                "id": "nissan",
                "text": "Nissan",
                "vehicleType": [1, 2]
            },
            {
                "id": "peugeot",
                "text": "Peugeot",
                "vehicleType": [1, 2]
            },
            {
                "id": "polestar",
                "text": "Polestar",
                "vehicleType": [1]
            },
            {
                "id": "porsche",
                "text": "Porsche",
                "vehicleType": [1]
            },
            {
                "id": "renault",
                "text": "Renault",
                "vehicleType": [1, 2]
            },
            {
                "id": "seat",
                "text": "Seat",
                "vehicleType": [1]
            },
            {
                "id": "skoda",
                "text": "Skoda",
                "vehicleType": [1]
            },
            {
                "id": "smart",
                "text": "Smart",
                "vehicleType": [1]
            },
            {
                "id": "suzuki",
                "text": "Suzuki",
                "vehicleType": [1]
            },
            {
                "id": "tesla",
                "text": "Tesla",
                "vehicleType": [1]
            },
            {
                "id": "toyota",
                "text": "Toyota",
                "vehicleType": [1, 2]
            },
            {
                "id": "vauxhall",
                "text": "Vauxhall",
                "vehicleType": [1, 2]
            },
            {
                "id": "volkswagen",
                "text": "Volkswagen",
                "vehicleType": [1, 2]
            },
            {
                "id": "volvo",
                "text": "Volvo",
                "vehicleType": [1]
            }
        ];
    }
}

export default CollectionsHelper; 