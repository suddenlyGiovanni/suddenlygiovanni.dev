export interface Route<
  URI extends string = string,
  URL extends `/${string}` = `/${string}`,
  Title extends string = string,
  Description extends string = string,
  Disabled extends boolean = boolean,
  Hidden extends boolean = boolean
> {
  /** unique route identifier */
  readonly uri: URI

  /** Route Url */
  readonly url: URL

  /** The human-readable route name */
  readonly title: Title

  /** Route description */
  readonly description: Description

  /** Determine if the route should be not reachable */
  readonly disabled: Disabled

  /** Determine if the route should not be rendered/shown */
  readonly hidden: Hidden
}

export class RoutesMap<R extends Route = Route> {
  private static instance?: RoutesMap
  private readonly routes: ReadonlyArray<R>
  private readonly routesEntries: ReadonlyArray<[uri: R['uri'], route: R]>
  private readonly routesMap: ReadonlyMap<R['uri'], R>

  private constructor(routes: ReadonlyArray<R>) {
    this.routes = routes
    this.routesEntries = this.routes.map((route) => [route.uri, route])
    this.routesMap = new Map(this.routesEntries)
  }

  /** Initialize RoutesMap as a Singleton */
  public static int<R extends Route>(routes: ReadonlyArray<R>): RoutesMap<R> {
    if (this.instance instanceof RoutesMap) return this.instance as RoutesMap<R>
    this.instance = new RoutesMap<R>(routes)
    return this.instance as RoutesMap<R>
  }

  static filterNonHiddenRoutesEntries<R extends Route>(
    routes: ReadonlyArray<R>
  ): ReadonlyArray<R> {
    return this.int(routes)
      .getNonHiddenRoutesEntries()
      .flatMap(([_, routes]) => routes)
  }

  /**
   * given a rute URI returns a Route data
   */
  public getRoute<URI extends R['uri']>(routeURI: URI): R {
    return this.routesMap.get(routeURI)!
  }

  /**
   * returns the route the route entries
   */
  public getRoutesEntries(): ReadonlyArray<[uri: R['uri'], route: R]> {
    return this.routesEntries
  }

  /**
   * returns only the not hidden route entries
   */
  public getNonHiddenRoutesEntries(): ReadonlyArray<[uri: R['uri'], route: R]> {
    return this.routesEntries.filter(([_, route]) => !route.hidden)
  }

  /**
   * returns a the routes as a ReadOnly Array data structure
   */
  public getRoutes(): ReadonlyArray<R> {
    return this.routes
  }
}
