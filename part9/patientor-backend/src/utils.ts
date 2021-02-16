/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

/**
 * Try to parse any object into a NewPatient
 * @param object The object to parse
 */
const toNewPatient = (object: any): NewPatient => {
  const newPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: [],
  };

  return newPatient;
};

/**
 * Verify if input is a string
 * @param text The object to check
 */
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

/**
 * Try to parse any object into a string
 * @param str The object to parse
 */
const parseString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error('Incorrect or missing string: ' + str);
  }

  return str;
};

/**
 * Verify if input is a valid date
 * @param date The object to check
 */
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

/**
 * Try to parse any object into a date
 * @param date The object to parse
 */
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

/**
 * Verify if input is a valid Gender
 * @param param The object to check
 */
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

/**
 * Try to parse any object into a Gender
 * @param gender The object to parse
 */
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export default toNewPatient;
