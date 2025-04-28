     
        document.querySelector("form").addEventListener("submit", function(event) {
            event.preventDefault();  // Prevent page refresh
        
            let dnaSequence = document.getElementById("dnaInput").value.trim().toUpperCase();
        
            if (dnaSequence === "" || !/^[ATGC]+$/.test(dnaSequence)) {
                alert("Please enter a valid DNA sequence (A, T, G, C only).");
                return;
            }
        
            // Convert DNA to Protein
            let proteinChain = convertDNAtoProtein(dnaSequence);
            let molecularWeight = calculateMolecularWeight(proteinChain);
            let hydrophilicity = calculateHydrophilicity(proteinChain);
            let aromaticity = calculateAromaticity(proteinChain);
        
            // Store values in localStorage
            localStorage.setItem("proteinChain", proteinChain);
            localStorage.setItem("molecularWeight", molecularWeight);
            localStorage.setItem("hydrophilicity", hydrophilicity);
            localStorage.setItem("aromaticity", aromaticity);
        
            // Debugging logs
            console.log("Protein Chain:", proteinChain);
            console.log("Molecular Weight:", molecularWeight);
            console.log("Hydrophilicity:", hydrophilicity);
            console.log("Aromaticity:", aromaticity);
        
            // Redirect to results page
            window.location.href = "results";
        });
        
        /**
         * Converts a DNA sequence into a protein sequence.
         */
        function convertDNAtoProtein(dna) {
            const codonTable = {
                "TTT": "F", "TTC": "F", "TTA": "L", "TTG": "L",
                "CTT": "L", "CTC": "L", "CTA": "L", "CTG": "L",
                "ATT": "I", "ATC": "I", "ATA": "I", "ATG": "M",  // Start codon
                "GTT": "V", "GTC": "V", "GTA": "V", "GTG": "V",
                "TCT": "S", "TCC": "S", "TCA": "S", "TCG": "S",
                "CCT": "P", "CCC": "P", "CCA": "P", "CCG": "P",
                "ACT": "T", "ACC": "T", "ACA": "T", "ACG": "T",
                "GCT": "A", "GCC": "A", "GCA": "A", "GCG": "A",
                "TAT": "Y", "TAC": "Y", "TAA": "*", "TAG": "*", // Stop codons
                "CAT": "H", "CAC": "H", "CAA": "Q", "CAG": "Q",
                "AAT": "N", "AAC": "N", "AAA": "K", "AAG": "K",
                "GAT": "D", "GAC": "D", "GAA": "E", "GAG": "E",
                "TGT": "C", "TGC": "C", "TGA": "*", "TGG": "W",
                "CGT": "R", "CGC": "R", "CGA": "R", "CGG": "R",
                "AGT": "S", "AGC": "S", "AGA": "R", "AGG": "R",
                "GGT": "G", "GGC": "G", "GGA": "G", "GGG": "G"
            };
        
            let protein = "";
            for (let i = 0; i < dna.length - 2; i += 3) {
                let codon = dna.substring(i, i + 3);
                if (codonTable[codon]) {
                    if (codonTable[codon] === "*") break; // Stop translation
                    protein += codonTable[codon];
                }
            }
            return protein || "Invalid Sequence";
        }
        
        /**
         * Calculates Molecular Weight of Protein Chain.
         */
        function calculateMolecularWeight(protein) {
            const aminoAcidMass = {
                "A": 89.1, "R": 174.2, "N": 132.1, "D": 133.1, "C": 121.2,
                "E": 147.1, "Q": 146.2, "G": 75.1, "H": 155.2, "I": 131.2,
                "L": 131.2, "K": 146.2, "M": 149.2, "F": 165.2, "P": 115.1,
                "S": 105.1, "T": 119.1, "W": 204.2, "Y": 181.2, "V": 117.1
            };
        
            let weight = 0;
            for (let aa of protein) {
                weight += aminoAcidMass[aa] || 0;
            }
            return weight.toFixed(2) + " Da";
        }
        
        /**
         * Calculates Hydrophilicity Score.
         */
        function calculateHydrophilicity(protein) {
            const hydrophilicityIndex = {
                "A": 1.8, "R": -4.5, "N": -3.5, "D": -3.5, "C": 2.5,
                "E": -3.5, "Q": -3.5, "G": -0.4, "H": -3.2, "I": 4.5,
                "L": 3.8, "K": -3.9, "M": 1.9, "F": 2.8, "P": -1.6,
                "S": -0.8, "T": -0.7, "W": -0.9, "Y": -1.3, "V": 4.2
            };
        
            let total = 0;
            for (let aa of protein) {
                total += hydrophilicityIndex[aa] || 0;
            }
            return (total / protein.length).toFixed(2);
        }
        
        /**
         * Calculates Aromaticity (Percentage of F, W, Y).
         */
        function calculateAromaticity(protein) {
            let aromaticCount = (protein.match(/[FWY]/g) || []).length;
            return (aromaticCount / protein.length).toFixed(2);
        }