import { supabase } from './supabaseClient.js';


// Define a function to calculate the gap
const calculateGap = (data, target) => {
    // Array kosong untuk menyimpan gap
    const gap = [];

    // Variabel untuk menyimpan profil id
    let currentProfil = null;

    // Objek kosong untuk menyimpan data sementara
    let temp = {};

    for (const profileData of data) {
        // Cek apakah profil id saat ini sama dengan index saat ini
        if (profileData.id_profil !== currentProfil) {
            // Cek apakah objek temp tidak kosong
            if (Object.keys(temp).length > 0) {
                // Masukkan objek temp ke array gap
                gap.push(temp);
            }
            temp = {};
            currentProfil = profileData.id_profil;
        }
        // Ambil kode dan value dari profil data
        const { kode, value } = profileData;
        // Ambil gap dengan mengurangi value dengan profil preferensi
        const result = value - target[kode];
        // Format hasil gap menjadi 3 angka di belakang koma
        const formattedResult = parseFloat(result.toFixed(3));
        // Masukkan hasil gap ke objek temp
        temp[kode] = formattedResult;
    }
    // Cek apakah objek temp tidak kosong
    if (Object.keys(temp).length > 0) {
        // Masukkan objek temp ke array gap
        gap.push(temp);
    }

    // Return array gap
    return gap;
};

const calculateWeight = (gap, bobot) => {
    const weight = [];

    for (const gapData of gap) {
        const temp = {};
        for (const key in gapData) {
            if (bobot.find(item => item.nilai_gap === gapData[key])) {
                const result = bobot.find(item => item.nilai_gap === gapData[key]).bobot_gap;
                temp[key] = result;
            } else {
                const result = linearInterpolation(gapData[key], bobot);
                temp[key] = parseFloat(result.toFixed(3));
            }
        }
        weight.push(temp);
    }

    return weight;
}

const groupToCriteria = (weight, kriteria) => {
    const grouped = [];

    for (const weightData of weight) {
        const temp = [];
        for (const key in weightData) {
            const matchCriteria = kriteria.find(item => item.kode === key);

            if (matchCriteria) {
                const criteriaCode = matchCriteria.kriteria.kode_kriteria;
                const factor = matchCriteria.faktor;

                if (!temp[criteriaCode]) {
                    temp[criteriaCode] = [];
                }

                if (!temp[criteriaCode][factor]) {
                    temp[criteriaCode][factor] = [];
                }

                temp[criteriaCode][factor].push(weightData[key]);
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
            .select('*')
            .order('id_profil', { ascending: true });
        const { data: weight } = await supabase
            .from('gap')
            .select('nilai_gap, bobot_gap');
        const { data: subkriteria } = await supabase
            .from('subkriteria')
            .select('kode, faktor, kriteria(kode_kriteria, bobot)')
        const { data: kriteria } = await supabase
            .from('kriteria')
            .select('kode_kriteria, bobot');
        const { count: jumlah_kriteria } = await supabase
            .from('kriteria')
            .select('*', { count: 'exact', head: true });
        const { data: detail_partai } = await supabase
            .from('detail_partai')
            .select('nama_partai, singkatan');

        if (error) {
            console.log(error);
            return null
        } else {
            return [profil, weight, subkriteria, kriteria, detail_partai, jumlah_kriteria];
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