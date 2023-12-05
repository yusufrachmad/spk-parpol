import { supabase } from './supabaseClient.js';


const calculateGap = (data, target) => {
    const gap = [];

    for (let i = 0; i < data.length; i++) {
        const temp = [];
        for (let j = 0; j < 10; j++) {
            const result = data[i][`SC${j + 1}`] - target[j];
            temp[`SC${j + 1}`] = parseFloat(result.toFixed(3));
        }
        gap.push(temp);
    }
    return gap;
}

const calculateWeight = (gap, bobot) => {
    const weight = [];
    for (let i = 0; i < 18; i++) {
        const temp = [];
        for (let j = 0; j < 10; j++) {
            if (bobot.find(item => item.nilai_gap === gap[i][`SC${j + 1}`])) {
                const result = bobot.find(item => item.nilai_gap === gap[i][`SC${j + 1}`]).bobot_gap;
                temp[`SC${j + 1}`] = result;
            } else {
                const result = linearInterpolation(gap[i][`SC${j + 1}`], bobot);
                temp[`SC${j + 1}`] = parseFloat(result.toFixed(3));
            }
        }
        weight.push(temp);
    }

    return weight;
}

const groupToCriteria = (weight, kriteria) => {
    const grouped = [];
    for (let i = 0; i < 18; i++) {
        const temp = [];
        for (let j = 0; j < 10; j++) {
            const key = `SC${j + 1}`;
            const value = weight[i][key];

            const matchCriteria = kriteria.find(item => item.kode === `SC${j + 1}`);

            if (matchCriteria) {
                const criteriaCode = matchCriteria.kriteria.kode_kriteria;
                const factor = matchCriteria.faktor;

                if (!temp[criteriaCode]) {
                    temp[criteriaCode] = [];
                }

                if (!temp[criteriaCode][factor]) {
                    temp[criteriaCode][factor] = [];
                }

                temp[criteriaCode][factor].push(value);
            }
        }
        grouped.push(temp);
    }
    return grouped;
}

const calculateTotalValue = (group) => {
    const result = [];
    const groupedTotal = group.map(item => {
        const temp = [];
        Object.keys(item).forEach(key => {
            temp[key] = [];

            if (item[key]['CF']) {
                const cfValues = item[key]['CF'];
                const cfTotal = cfValues.reduce((acc, val) => acc + val, 0);
                const cfAverage = cfTotal / cfValues.length;

                temp[key]['CF'] = cfAverage
            }

            if (item[key]['SF']) {
                const sfValues = item[key]['SF'];
                const sfTotal = sfValues.reduce((acc, val) => acc + val, 0);
                const sfAverage = sfTotal / sfValues.length;

                temp[key]['SF'] = sfAverage
            }

            if (temp[key]['CF'] && temp[key]['SF']) {
                temp[key]['total'] = 0.6 * temp[key]['CF'] + 0.4 * temp[key]['SF'];
            } else if (temp[key]['CF']) {
                temp[key]['total'] = 0.6 * temp[key]['CF'];
            } else if (temp[key]['SF']) {
                temp[key]['total'] = 0.4 * temp[key]['SF'];
            }
        })
        return temp;
    })

    groupedTotal.forEach(item => {
        const temp = [];
        Object.keys(item).forEach(key => {
            temp[key] = item[key]['total'];
        })
        return result.push(temp);
    })
    return result;
}

const linearInterpolation = (gap, bobot) => {
    const x1 = Math.floor(gap);
    const x2 = Math.ceil(gap);
    const y1 = bobot.find(item => item.nilai_gap === x1).bobot_gap;
    const y2 = bobot.find(item => item.nilai_gap === x2).bobot_gap;
    const result = y1 + ((gap - x1) * (y2 - y1)) / (x2 - x1);
    return result;
}

const getData = async () => {
    try {
        const { data: profil, error } = await supabase
            .from('profil_partai')
            .select('SC1, SC2, SC3, SC4, SC5, SC6, SC7, SC8, SC9, SC10');
        const { data: weight, error: error2 } = await supabase
            .from('gap')
            .select('nilai_gap, bobot_gap');
        const { data: subkriteria, error: error3 } = await supabase
            .from('subkriteria')
            .select('kode, faktor, kriteria(kode_kriteria, bobot)')
        const { data: kriteria, error: error4 } = await supabase
            .from('kriteria')
            .select('kode_kriteria, bobot');
        const { data: detail_partai, error: error5 } = await supabase
            .from('detail_partai')
            .select('nama_partai, singkatan');

        if (error) {
            console.log(error);
            return null
        } else {
            return [profil, weight, subkriteria, kriteria, detail_partai];
        }
    } catch {
        console.error(error.message);
        return null
    }
}

export const profileMatching = async (target) => {
    const data = await getData();
    const profil = data[0];
    const bobot = data[1];
    const subkriteria = data[2];
    const gap = calculateGap(profil, target);
    const weight = calculateWeight(gap, bobot);
    const group = groupToCriteria(weight, subkriteria);
    const totalValue = calculateTotalValue(group);

    return [data, totalValue];
}