document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dnaForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // prevent page reload

        const dna = document.getElementById('dnaInput').value.toUpperCase().replace(/[^ATGC]/g, '');
        if (!dna) {
            alert("Please enter a valid DNA sequence (A, T, G, C only).");
            return;
        }

        const baseCounts = countBases(dna);
        drawChart(baseCounts);

        const protein = translateDNA(dna);
        const weight = calculateMolecularWeight(protein);
        const hydrophilicity = calculateHydrophilicity(protein);
        const aromaticity = calculateAromaticity(protein);

        // You can add this to your HTML to show results
       // Save results to localStorage
localStorage.setItem("proteinChain", protein);
localStorage.setItem("molecularWeight", weight.toFixed(2));
localStorage.setItem("hydrophilicity", hydrophilicity.toFixed(2));
localStorage.setItem("aromaticity", aromaticity.toFixed(2));

// Redirect to results page
window.location.href = "/results";

    });
});

function countBases(seq) {
    return {
        A: (seq.match(/A/g) || []).length,
        T: (seq.match(/T/g) || []).length,
        G: (seq.match(/G/g) || []).length,
        C: (seq.match(/C/g) || []).length
    };
}

function drawChart(counts) {
    const ctx = document.getElementById('dnaChart').getContext('2d');
    if (window.dnaChartInstance) window.dnaChartInstance.destroy(); // Reset if chart already exists

    window.dnaChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'T', 'G', 'C'],
            datasets: [{
                label: 'Base Count',
                data: [counts.A, counts.T, counts.G, counts.C],
                backgroundColor: ['#ff6666', '#66ccff', '#99ff99', '#ffcc99']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function translateDNA(dna) {
    const codonTable = {
        "ATA":"I","ATC":"I","ATT":"I","ATG":"M","ACA":"T","ACC":"T","ACG":"T","ACT":"T",
        "AAC":"N","AAT":"N","AAA":"K","AAG":"K","AGC":"S","AGT":"S","AGA":"R","AGG":"R",
        "CTA":"L","CTC":"L","CTG":"L","CTT":"L","CCA":"P","CCC":"P","CCG":"P","CCT":"P",
        "CAC":"H","CAT":"H","CAA":"Q","CAG":"Q","CGA":"R","CGC":"R","CGG":"R","CGT":"R",
        "GTA":"V","GTC":"V","GTG":"V","GTT":"V","GCA":"A","GCC":"A","GCG":"A","GCT":"A",
        "GAC":"D","GAT":"D","GAA":"E","GAG":"E","GGA":"G","GGC":"G","GGG":"G","GGT":"G",
        "TCA":"S","TCC":"S","TCG":"S","TCT":"S","TTC":"F","TTT":"F","TTA":"L","TTG":"L",
        "TAC":"Y","TAT":"Y","TAA":"_","TAG":"_","TGC":"C","TGT":"C","TGA":"_","TGG":"W"
    };
    let protein = "";
    for (let i = 0; i < dna.length - 2; i += 3) {
        const codon = dna.substring(i, i + 3);
        protein += codonTable[codon] || "?";
    }
    return protein;
}

function calculateMolecularWeight(protein) {
    const weights = {
        A: 89.1, R: 174.2, N: 132.1, D: 133.1, C: 121.2,
        Q: 146.2, E: 147.1, G: 75.1, H: 155.2, I: 131.2,
        L: 131.2, K: 146.2, M: 149.2, F: 165.2, P: 115.1,
        S: 105.1, T: 119.1, W: 204.2, Y: 181.2, V: 117.1
    };
    return protein.split('').reduce((sum, aa) => sum + (weights[aa] || 0), 0);
}

function calculateHydrophilicity(protein) {
    const hydrophilic = new Set(['D', 'E', 'K', 'R', 'N', 'Q']);
    let count = 0;
    for (let aa of protein) {
        if (hydrophilic.has(aa)) count++;
    }
    return protein.length ? count / protein.length : 0;
}

function calculateAromaticity(protein) {
    const aromatic = new Set(['F', 'W', 'Y']);
    let count = 0;
    for (let aa of protein) {
        if (aromatic.has(aa)) count++;
    }
    return protein.length ? count / protein.length : 0;
}
