const weatherText = (value: number) => {

   let weatherConditionText: string 

   switch (value) {
      case 1:
         weatherConditionText = "Klart"
         break;
      case 2:
         weatherConditionText = "Lätt molnighet"
         break;
      case 3:
         weatherConditionText = "Halvklart"
         break;
      case 4:
         weatherConditionText = "Molnigt"
         break;
      case 5:
         weatherConditionText = "Mycket moln"
         break;
      case 6:
         weatherConditionText = "Mulet"
         break;
      case 7:
         weatherConditionText = "Dimma"
         break;
      case 8:
         weatherConditionText = "Lätt regnskur"
         break;
      case 9:
         weatherConditionText = "Regnskur"
         break;
      case 10:
         weatherConditionText = "Kraftig regnskur"
         break;
      case 11: 
         weatherConditionText = "Åskskur"
         break;
      case 12: 
         weatherConditionText = "Lätta byar av regn och snö"
         break;
      case 13: 
         weatherConditionText = "Byar av regn och snö"
         break;
      case 14: 
         weatherConditionText = "Kraftiga byar av regn och snö"
         break;
      case 15:
         weatherConditionText = "Lätta snöbyar"
         break;
      case 16:
         weatherConditionText = "Snöbyar"
         break;
      case 17:
         weatherConditionText = "Kraftiga snöbyar"
         break;
      case 18:
         weatherConditionText = "Lätt regn"
         break;
      case 19: 
         weatherConditionText = "Regn"
         break;
      case 20:
         weatherConditionText = "Kraftigt regn"
         break;
      case 21:
         weatherConditionText = "Åska"
         break;
      case 22:
         weatherConditionText = "Lätt snöblandat regn"
         break;
      case 23:
         weatherConditionText = "Snöblandat regn"
         break;
      case 24:
         weatherConditionText = "Kraftigt snöblandat regn"
         break;
      case 25:
         weatherConditionText = "Lätt snöfall"
         break;
      case 26:
         weatherConditionText = "Snöfall"
         break;
      case 27:
         weatherConditionText = "Ymnigt snöfall"
         break;
      default: 
         weatherConditionText = "Kunde ej fastställa prognos"
   }
   
   return weatherConditionText
}

export default weatherText