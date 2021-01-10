export function journalEntryWeek(startDate, journalDate) {
    
    let oneDay = 1000 * 60 * 60 * 24; //1 day in ms (to calculate the days back below)
    let formatStartDate = new Date(startDate); //formating of start date correct, may not be needed depedning on how saved
    let formatJournalDate = new Date(journalDate)
    let daysPast = Math.round((formatStartDate.getTime() - formatJournalDate.getTime()) / oneDay) *
    -1; //start date minus current date converted to milliseconds, the converted back in to a day
    
    if (daysPast < 0) {
      return 'week0';
    } else if (daysPast > 0 && daysPast <= 7) {
      return 'week1';
    } else if (daysPast > 7 && daysPast <= 14) {
      return 'week2';
    } else if (daysPast > 14 && daysPast <= 21) {
      return 'week3';
    } else if (daysPast > 21 && daysPast <= 28) {
      return 'week3';
    } else if (daysPast > 28 && daysPast <= 35) {
      return 'week4';
    } else if (daysPast > 35 && daysPast <= 42) {
      return 'week5';
    } else if (daysPast > 42 && daysPast <= 49) {
      return 'week6';
    } else if (daysPast > 49 && daysPast <= 56) {
      return 'week7';
    } else if (daysPast > 56 && daysPast <= 63) {
      return 'week8';
    } else if (daysPast > 63 && daysPast <= 70) {
      return 'week9';
    } else if (daysPast > 70 && daysPast <= 77) {
      return 'week10';
    } else if (daysPast > 77 && daysPast <= 84) {
      return 'week11';
    } else if (daysPast > 84 && daysPast <= 91) {
      return 'week12';
    } else if (daysPast > 91 && daysPast <= 98) {
      return 'week13';
    } else if (daysPast > 98 && daysPast <= 105) {
      return 'week14';
    } else if (daysPast > 112 && daysPast <= 119) {
      return 'week15';
    } else if (daysPast > 119 && daysPast <= 126) {
      return 'week16';
    } else if (daysPast > 126 && daysPast <= 133) {
      return 'week17';
    } else if (daysPast > 133 && daysPast <= 140) {
      return 'week18';
    }
  }
  