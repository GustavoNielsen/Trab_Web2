export class Utils {
    static dateToRest(d: string): string {
        if (d) {
            let dia, mes, ano;
            if (d.indexOf("/") == -1) {
                dia = d.substring(0, 2);
                mes = d.substring(2, 4);
                ano = d.substring(4);
            }
            else {
                [dia, mes, ano] = d.split("/")
            }
            return `${ano}-${mes}-${dia}`;
        }
        else {
            return "";
        }
    }

    static dateFromRest(d: string) {
        if (d) {
            const [ano, mes, dia] = d.split("-");
            return `${dia}/${mes}/${ano}`
        }
        else {
            return "";
        }
    }
}