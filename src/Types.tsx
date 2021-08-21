interface ITrain {
  cancelled: boolean,
  commuterLineID: string,
  departureDate: Date,
  operatorShortCode: string,
  operatorUICCode: number,
  runningCurrently: boolean,
  timeTableRows: ITimetableRow[],
  timetableAcceptanceDate: Date,
  timetableType: string,
  trainCategory: string,
  trainNumber: number,
  trainType: string,
}

interface ILocation {
  type: 'Point',
  coordinates: number[],
  speed: number,
}

interface IPassengerTerm {
  fi: string;
  en: string;
  sv: string;
}

interface IDelayCode {
  id: number;
  detailedCategoryCode: string;
  detailedCategoryName: string;
  validFrom: Date;
  passengerTerm: IPassengerTerm;
}

interface ITranLocation {
  trainNumber: number,
  departureDate: Date,
  timestamp: Date
  location: ILocation,
}

interface IDelay {
  categoryCode: string;
  detailedCategoryCode: string;
  thirdCategoryCode: string;
  categoryCodeId: string;
  detailedCategoryCodeId: number;
  thirdCategoryCodeId: string;
}

interface ITimetableRow {
  actualTime?: Date,
  cancelled: boolean,
  causes?: IDelay[],
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

interface IStation {
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
  ITrain, ITranLocation, ITimetableRow, IStation, IDelayCode,
};
