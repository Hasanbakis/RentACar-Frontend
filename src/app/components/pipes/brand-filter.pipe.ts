import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from 'src/app/models/brand';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Brand[], filterTextBrand: string): Brand[] {
    filterTextBrand = filterTextBrand?filterTextBrand.toLocaleLowerCase():""
    return filterTextBrand?value.filter((b:Brand)=>b.brandName.toLocaleLowerCase().indexOf(filterTextBrand)!==-1):value;

  }

}
