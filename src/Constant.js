export const relationships =['Spouse','Child','Parent','Sibling','Domestic Partner','Domestic Partner Child'];
export const genders =['Male','Female'];
export const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
    ERROR: "ERROR"
  };
export const countries =['United States','Canada'];
export const beneficiarytypes =['Person','Trust','Organization/Charity','My Estate'];
export const types =['Primary','Secondary'];
export const data = [
  
  { id: 1,
   personid: 1,
   name: 'TEST 1',
   dateOfBirth: '2021-01-01',
   relationship: 'Sibiling',
   isActive: true,
   type: 'Primary',
   percentage: '20'},
   { id: 2,
    personid: 1,
    name: 'TEST 2',
    dateOfBirth: '2021-01-01',
    relationship: 'Spouse',
    isActive: true,
    type: 'Primary',
   percentage: '20'},
    { id: 3,
      personid: 1,
      name: 'TEST 2',
      dateOfBirth: '2021-01-01',
      relationship: '',
      isActive: true,
      type: 'Primary',
   percentage: '20'}
];