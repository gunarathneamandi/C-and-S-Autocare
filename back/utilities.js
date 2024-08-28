let Utilities = {};

Utilities.generateUniqueId = async (Schema, schema_id, upperLimit, lowerLimit) => {
    let uniqueId = Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);

    let result = await Schema.findOne({ schema_id : uniqueId });
    if(!result)
    {
        return uniqueId;
    }
    else
    {
        return generateUniqueId(Schema, upperLimit, lowerLimit);
    }
}

export default Utilities;