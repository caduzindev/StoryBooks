import moment from 'moment'

export class HbsHelper{
    public static formatDate(date:string,format:string):string{
        return moment(date).format(format)
    }
}