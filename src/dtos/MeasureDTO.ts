type MeasureDTO = {
    id: string;
    image: Buffer;
    URI: string;
    value: number;
    customer_code: string;
    date: Date;
    type: string;
    has_confirmed: boolean;
  };
  
export default MeasureDTO;
