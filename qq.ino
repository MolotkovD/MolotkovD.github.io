#include <LCD_1602_RUS.h>
#include <SoftwareSerial.h>
#define pinWaterLevel A0  // пин аналогового выхода датчика уров-ня воды
#define pinSoilMoisture A1 //пин аналогового выхода датчик влаж-ности почвы
#define pinRelayPump 12   //пин реле для управление насосом
const int pinRX = 2; //RX – вход для приема данных -> к TX bluetooth
const int pinTX = 3; //TX – выход для передачи данных -> к RX bluetooth
SoftwareSerial mySerial(2,3);
LCD_1602_RUS lcd(0x27, 16, 2);
#define sensorPin  A0 //номер пина влажности почвы
int sensorValue = 0;  //переменная значения влажности
int g = 0;
const int delayPumpBefore=2;     //время полива (в секундах)
const int delayPumpAfter=30; //время после полива, чтобы земля пропиталась (в секундах)
const int minMoisture=600; //минимальный порог влажности почвы
    
  // переменны
int aLevel = 0; // значение датчика уровня воды 
int aMoisture = 0; // состояние датчика влажности почвы 
int levels[3]={600,500,400}; //массив значений уровней воды
  
void setup() { 
  lcd.init(); 
  lcd.backlight();
  pinMode(12, OUTPUT);
  pinMode(pinRX, INPUT);
  pinMode(pinTX, OUTPUT);
  //объявляем пин реле для включения насоса как выход: 
  pinMode(pinRelayPump, OUTPUT);    
    //объявляем пины датчиков глубины и влажности почвы как входы: 
  pinMode(pinWaterLevel, INPUT); 
  pinMode(pinSoilMoisture, INPUT); 
  mySerial.begin(9600);
  
}
void loop() {
  // считываем значение датчика уровня воды 
         aLevel=analogRead(pinWaterLevel);    
      // считываем состояния датчика влажности почвы
        sensorValue = analogRead (pinSoilMoisture);
        int val = map(sensorValue, 0, 1023, 0, 100);
        delay(100); 
       // если почва сухая  и вода в банке есть, то включаем полив 
       if ((sensorValue >minMoisture)&&(aLevel>levels[2])) { 
        digitalWrite(pinRelayPump, HIGH); //включаем насос 
        delay(delayPumpBefore*1000);      //задержка на полив
        digitalWrite(pinRelayPump, LOW);  //выключаем насос
        delay(delayPumpAfter*1000);       //задержка на слив воды из шланга после выключения насоса
       } 
       else { 
        digitalWrite(pinRelayPump, LOW); 
        } 
  lcd.home();
  sensorValue = analogRead(sensorPin);
  
  mySerial.print(val);
  mySerial.print("%  ");
  mySerial.print("Насос: ");
  mySerial.print()
  lcd.print(val);
  lcd.setCursor(3, 0);
  lcd.print("% влажность");
  lcd.setCursor(0, 1);
  lcd.print("Насос: ");
  

  lcd.setCursor(3, 1);
  lcd.print("")
  delay(500);
  lcd.clear();
}
