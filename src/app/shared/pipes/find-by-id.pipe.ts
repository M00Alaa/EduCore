import { Pipe, PipeTransform } from '@angular/core';

/**
 * Finds an item in an array by its `id` property and returns its `name`.
 * Usage: {{ items | findById : selectedId }}
 */
@Pipe({ name: 'findById', standalone: true })
export class FindByIdPipe implements PipeTransform {
    transform(items: { id: number; name: string }[] | null | undefined, id: number | null | undefined): string {
        if (!items || id == null) return '';
        return items.find(item => item.id === id)?.name ?? '';
    }
}
