import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateAgo', standalone: true, pure: false })
export class DateAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    const seconds = Math.floor((Date.now() - new Date(value).getTime()) / 1000);

    const lang = localStorage.getItem('app_lang') ?? 'es-MX';
    const isEs = lang === 'es-MX';

    const intervals: { label: string; labelEn: string; plural: string; pluralEn: string; seconds: number }[] = [
      { label: 'año',    labelEn: 'year',   plural: 'años',    pluralEn: 'years',   seconds: 31536000 },
      { label: 'mes',    labelEn: 'month',  plural: 'meses',   pluralEn: 'months',  seconds: 2592000  },
      { label: 'semana', labelEn: 'week',   plural: 'semanas', pluralEn: 'weeks',   seconds: 604800   },
      { label: 'día',    labelEn: 'day',    plural: 'días',    pluralEn: 'days',    seconds: 86400    },
      { label: 'hora',   labelEn: 'hour',   plural: 'horas',   pluralEn: 'hours',   seconds: 3600     },
      { label: 'minuto', labelEn: 'minute', plural: 'minutos', pluralEn: 'minutes', seconds: 60       },
    ];

    for (const i of intervals) {
      const count = Math.floor(seconds / i.seconds);
      if (count >= 1) {
        if (isEs) {
          return `hace ${count} ${count === 1 ? i.label : i.plural}`;
        } else {
          return `${count} ${count === 1 ? i.labelEn : i.pluralEn} ago`;
        }
      }
    }
    return isEs ? 'hace un momento' : 'just now';
  }
}
