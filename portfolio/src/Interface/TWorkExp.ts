export type WorkExp = {
    user_id :string;
    company_name:string;
    position:string;
    duration:string;
    description:string;
    project_id:string;


}


export type WorkExpResponse ={
    total_item:string;
    data:WorkExp[];
}