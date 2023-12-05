import { profileMatching } from "./profileMatching";

export const topsis = async (target) => {
    const [data, pmValue] = await profileMatching(target);
    const normalized = normalizeMatrix(pmValue);
    const weightedNotmalized = weghtedNormalizedMatrix(normalized, data[3]);
    const ideal = idealSolution(weightedNotmalized);
    const antiIdeal = antiIdealSolution(weightedNotmalized);
    const distance = calculateDistance(weightedNotmalized, ideal, antiIdeal);
    const preference = calculatePreference(distance, data[4]);
    const ranking = sortRanking(preference);

    return ranking;
};

const normalizeMatrix = (data) => {
    const normalized = [];
    const criteria = [];

    // Grouping data by criteria
    for (const kriteria of data) {
        for (let i = 1; i <= 6; i++) {
            if (!criteria[`C${i}`]) {
                criteria[`C${i}`] = [];
            }
            criteria[`C${i}`].push(kriteria[`C${i}`]);
        }
    }

    // Calculate the squaredSum of every criteria
    for (const key in criteria) {
        const kriteria = criteria[key];
        const squaredSum = kriteria.reduce((acc, cur) => acc + Math.pow(cur, 2), 0);
        const sqrtSquaredSum = Math.sqrt(squaredSum);
        criteria[key] = sqrtSquaredSum;
    }

    // Normalize the each data of party
    for (let i = 0; i < data.length; i++) {
        const temp = [];
        for (let j = 1; j <= 6; j++) {
            const value = data[i][`C${j}`];
            const normalizedValue = value / criteria[`C${j}`];
            temp[`C${j}`] = normalizedValue;
        }
        normalized.push(temp);
    }
    return normalized;
}

const weghtedNormalizedMatrix = (normalized, bobot) => {
    const weightedNormalized = [];
    for (let i = 0; i < normalized.length; i++) {
        const temp = [];
        for (let j = 1; j <= 6; j++) {
            const weight = bobot.find(item => item.kode_kriteria === `C${j}`).bobot;
            const weightedValue = normalized[i][`C${j}`] * weight;
            temp[`C${j}`] = weightedValue;
        }
        weightedNormalized.push(temp);
    }
    return weightedNormalized;
}

const idealSolution = (weightedNormalized) => {
    const idealSolution = [];
    for (let i = 1; i <= 6; i++) {
        const temp = [];
        for (let j = 0; j < weightedNormalized.length; j++) {
            temp.push(weightedNormalized[j][`C${i}`]);
        }
        const max = Math.max(...temp);
        idealSolution.push(max);
    }
    return idealSolution;
};
const antiIdealSolution = (weightedNormalized) => {
    const antiIdealSolution = [];
    for (let i = 1; i <= 6; i++) {
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
    for (let i = 0; i < weightedNormalized.length; i++) {
        const idealDistance = [];
        const antiIdealDistance = [];
        for (let j = 0; j < 6; j++) {
            const value = weightedNormalized[i][`C${j + 1}`];
            const ideal = idealSolution[j];
            const antiIdeal = antiIdealSolution[j];
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