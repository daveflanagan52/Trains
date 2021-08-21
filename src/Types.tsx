interface Train {
  cancelled: boolean,
  commuterLineID: string,
  departureDate: Date,
  operatorShortCode: string,
  operatorUICCode: number,
  runningCurrently: boolean,
  timeTableRows: TimetableRow[],
  timetableAcceptanceDate: Date,
  timetableType: string,
  trainCategory: string,
  trainNumber: number,
  trainType: string,
}

interface Location {
  type: 'Point',
  coordinates: number[],
  speed: number,
}

interface PassengerTerm {
  fi: string;
  en: string;
  sv: string;
}

interface DelayCode {
  id: number;
  detailedCategoryCode: string;
  detailedCategoryName: string;
  validFrom: Date;
  passengerTerm: PassengerTerm;
}

interface TranLocation {
  trainNumber: number,
  departureDate: Date,
  timestamp: Date
  location: Location,
}

interface Delay {
  categoryCode: string;
  detailedCategoryCode: string;
  thirdCategoryCode: string;
  categoryCodeId: string;
  detailedCategoryCodeId: number;
  thirdCategoryCodeId: string;
}

interface TimetableRow {
  actualTime?: Date,
  cancelled: boolean,
  causes?: Delay[],
  commercialStop?: boolean,
  commercialTrack?: string,
  countryCode?: string,
  differenceInMinutes?: number,
  liveEstimateTime?: Date,
  scheduledTime: Date,
  stationShortCode: string,
  stationUICCode: number,
  trainStopping?: boolean,
  type: 'DEPARTURE' | 'ARRIVAL',
}

interface Station {
  countryCode: string,
  latitude: number,
  longitude: number,
  passengerTraffic: boolean,
  stationName: string,
  stationShortCode: string,
  stationUICCode: number,
  type: 'STATION' | 'STOPPING_POINT' | 'TURNOUT_IN_THE_OPEN_LINE',
}

export type {
  Train, TranLocation, TimetableRow, Station, DelayCode,
};
