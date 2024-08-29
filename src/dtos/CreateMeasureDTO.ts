type CreateMeasureDTO = {
    image: Buffer,
    customer_code: string,
    measure_datetime: Date,
    measure_type: string,
    URI: string,
    value: number
    };

export default CreateMeasureDTO;
