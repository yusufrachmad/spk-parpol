import { profileMatching } from "./profileMatching";

export const topsis = async (target) => {
    const [data, pmValue] = await profileMatching(target);
    const normalized = normalizeMatrix(pmValue);
    const weightedNotmalized = weghtedNormalizedMatrix(normalized, data[3]);
    const ideal = idealSolution(weightedNotmalized, data[5]);
    const antiIdeal = antiIdealSolution(weightedNotmalized, data[5]);
    const distance = calculateDistance(weightedNotmalized, ideal, antiIdeal);
    const preference = calculatePreference(distance, data[4]);
    const ranking = sortRanking(preference);

    return ranking;
};

const normalizeMatrix = (data) => {
    const normalized = [];
    const criteria = [];

    for (const kriteria of data) {
        for (const key in kriteria) {
            if (!criteria[key]) {
                criteria[key] = [];
            }
            criteria[key].push(kriteria[key]);
        }
    }

    for (const key in criteria) {
        const kriteria = criteria[key];
        const squaredSum = kriteria.reduce((acc, cur) => acc + Math.pow(cur, 2), 0);
        const sqrtSquaredSum = Math.sqrt(squaredSum);
        criteria[key] = sqrtSquaredSum;
    }

    for (const pmData of data) {
        const temp = {};
        for (const key in pmData) {
            const value = pmData[key];
            const normalizedValue = value / criteria[key];
            temp[key] = normalizedValue;
        }
        normalized.push(temp);
    }

    return normalized;
}

const weghtedNormalizedMatrix = (normalized, bobot) => {
    const weightedNormalized = [];

    for (const normalizedData of normalized) {
        const temp = {};
        for (const key in normalizedData) {
            const value = normalizedData[key];
            const weight = bobot.find(item => item.kode_kriteria === key).bobot;
            const weightedValue = value * weight;
            temp[key] = weightedValue;
        }
        weightedNormalized.push(temp);
    }

    return weightedNormalized;
}

const idealSolution = (weightedNormalized, totalCriteria) => {
    const idealSolution = [];

    for (let i = 1; i <= totalCriteria; i++) {
        const temp = [];
        for (let j = 0; j < weightedNormalized.length; j++) {
            temp.push(weightedNormalized[j][`C${i}`]);
        }
        const max = Math.max(...temp);
        idealSolution.push(max);
    }

    return idealSolution;
};
const antiIdealSolution = (weightedNormalized, totalCriteria) => {
    const antiIdealSolution = [];

    for (let i = 1; i <= totalCriteria; i++) {
        const temp = [];
        for (let j = 0; j < weightedNormalized.length; j++) {
            temp.push(weightedNormalized[j][`C${i}`]);
        }
        const min = Math.min(...temp);
        antiIdealSolution.push(min);
    }
    return antiIdealSolution;
};

const calculateDistance = (weightedNormalized, idealSolution, antiIdealSolution) => {
    const distance = [];
    for (const weightedData of weightedNormalized) {
        const idealDistance = [];
        const antiIdealDistance = [];
        for (const key in weightedData) {
            const value = weightedData[key];
            const ideal = idealSolution[key.substring(1) - 1];
            const antiIdeal = antiIdealSolution[key.substring(1) - 1];
            const distanceToIdeal = Math.pow(value - ideal, 2);
            const distanceToAntiIdeal = Math.pow(value - antiIdeal, 2);
            idealDistance.push(distanceToIdeal);
            antiIdealDistance.push(distanceToAntiIdeal);
        }
        const pis = Math.sqrt(idealDistance.reduce((acc, curr) => acc + curr, 0));
        const nis = Math.sqrt(antiIdealDistance.reduce((acc, curr) => acc + curr, 0));
        distance.push({ PIS: pis, NIS: nis });
    }

    return distance;
};
const calculatePreference = (distance, data) => {
    const preferences = [];
    for (const jarak of distance) {
        const preferenceValue = jarak['NIS'] / (jarak['PIS'] + jarak['NIS']);
        preferences.push(preferenceValue);
    }

    for (const key in data) {
        data[key]['nilai_preferensi'] = preferences[key];
        data[key]['persentase_preferensi'] = parseFloat((preferences[key] * 100).toFixed(2));
    }

    return data;
};

const sortRanking = (preference) => {
    const result = preference.sort((a, b) => b.nilai_preferensi - a.nilai_preferensi);
    return result;
};