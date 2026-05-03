export type FieldMapper<TSource extends object, TDestination extends object> = {
    [K in keyof TDestination]?: keyof TSource | ((source: TSource) => TDestination[K]);
};

export function mapSameFields<TSource extends object, TDestination extends object>(
    source: TSource,
    targetFactory: () => TDestination,
): TDestination {
    return Object.assign(targetFactory(), source as Partial<TDestination>);
}

export function mapFields<TSource extends object, TDestination extends object>(
    source: TSource,
    targetFactory: () => TDestination,
    fieldMap: FieldMapper<TSource, TDestination>,
): TDestination {
    const target = targetFactory();
    for (const key in fieldMap) {
        const destKey = key as keyof TDestination;
        const mapRule = fieldMap[destKey];

        if (typeof mapRule === 'function') {
            target[destKey] = mapRule(source);
        } else if (typeof mapRule === 'string') {
            const sourceKey = mapRule as keyof TSource;
            if (sourceKey in source) {
                target[destKey] = (source as any)[sourceKey];
            }
        }
    }
    return target;
}
