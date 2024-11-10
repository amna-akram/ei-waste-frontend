// Function to convert API data to the desired format
export function getCookingRejectedCountData(apiData) {
    const qualityData = {};

    apiData.data.forEach((entry) => {
        const { batch_date_out, status, batch_weight_out, batch_id } = entry;
        const date = new Date(batch_date_out).toISOString().split("T")[0];
        const product = batch_id.product_id.name;
        const department = batch_id.batch_number % 2 === 0 ? 'cooking' : 'packaging'; // Just a sample assignment
        const key = `${date}-${product}-${department}`;

        if (!qualityData[key]) {
            qualityData[key] = {
                date,
                product,
                department,
                totalOutput: 0,
                rejectedBatches: 0
            };
        }

        qualityData[key].totalOutput += batch_weight_out;
        if (status === "rejected") {
            qualityData[key].rejectedBatches += 1;
        }
    });
    console.log(qualityData)

    return Object.values(qualityData);
}

