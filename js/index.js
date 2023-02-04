
let input = document.querySelector("input[type='file']");
let table = document.querySelector("table");
let hasHeading = false;
let rowCount = 0;
input.addEventListener("change", function () {
    let files = this.files;
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (!file || file.size === 0) {
            alert("No file selected or file is empty");
            return;
        }
        let fileExtension = file.name.split(".").pop();
        if (fileExtension !== "csv") {
            alert("Invalid file type. Please select a .csv file.");
            return;
        }
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            let csv = reader.result;
            let rows = csv.split("\n");
            let tbody = document.createElement("tbody");

            for (let j = 1; j < rows.length - 1; j++) {
                let row = rows[j];
                let cells = row.split(",");
                let tr = document.createElement("tr");

                if (rowCount % 2 === 0) {
                    tr.style.backgroundColor = "#f2f2f2";
                }
                rowCount++;

                // Order Number
                let td = document.createElement("td");
                td.textContent = cells[0];
                tr.appendChild(td);

                // Profit/loss(%)
                // Profit/loss % = (Transferred Amount - Cost Price) / Cost Price * 100
                td = document.createElement("td");
                let saleAmount = parseInt(cells[1]);
                let costPrice = parseInt(cells[2]);
                let transferredAmount1 = parseInt(cells[3]);
                let profitLoss = transferredAmount1 - costPrice;
                console.log(transferredAmount1 + " " + costPrice);
                td.textContent = profitLoss.toFixed(0);
                tr.appendChild(td);

                // Transferred Amount
                td = document.createElement("td");
                td.textContent = cells[3];
                tr.appendChild(td);

                // Total Marketplace Charges
                td = document.createElement("td");
                let commission = parseInt(cells[4]);
                let paymentGateway = parseInt(cells[5]);
                let pickPackFee = parseInt(cells[6]);
                let totalMarketplaceCharges =
                    commission + paymentGateway + pickPackFee;
                td.textContent = totalMarketplaceCharges;
                tr.appendChild(td);

                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
        };
    }
});



