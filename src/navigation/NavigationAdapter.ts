import { CommonActions, StackActions, NavigationContainerRef } from '@react-navigation/native';

class NavigationAdapter {
  private _navigator?: NavigationContainerRef<any>;

  get navigator(): NavigationContainerRef<any> | undefined {
    return this._navigator;
  }

  set navigator(navigatorRef: NavigationContainerRef<any> | undefined) {
    this._navigator = navigatorRef;
  }

  getCurrentScreenName(): string {
    return this._navigator?.getCurrentRoute()?.name ?? '';
  }

  get canGoBack(): boolean {
    return this._navigator?.canGoBack() ?? false;
  }

  hasBack(): boolean {
    return this._navigator?.canGoBack() ?? false;
  }

  navigate(routeName: string, params?: object): void {
    this._navigator?.dispatch(CommonActions.navigate(routeName, params));
  }

  goBack(): void {
    if (this.canGoBack) {
      this._navigator?.dispatch(CommonActions.goBack());
    }
  }

  navigateWithResetAction(routeName: string, params?: object): void {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    });

    this._navigator?.dispatch(resetAction);
  }

  popToTop(): void {
    if (this.canGoBack) {
      this._navigator?.dispatch(StackActions.popToTop());
    }
  }

  reset(actions: { name: string; params?: object }[], index: number): void {
    this._navigator?.dispatch(
      CommonActions.reset({
        index,
        routes: actions,
      })
    );
  }

  push(routeName: string, params?: object): void {
    this._navigator?.dispatch(StackActions.push(routeName, params));
  }

  pop(number?: number): void {
    if (this.canGoBack) {
      this._navigator?.dispatch(StackActions.pop(number));
    }
  }

  replace(routeName: string, params?: object): void {
    this._navigator?.dispatch(StackActions.replace(routeName, params));
  }

  getParam<T>(classInstance: { props?: { route?: { params?: Record<string, any> } } }, paramName: string, defaultValue: T): T {
    return classInstance?.props?.route?.params?.[paramName] ?? defaultValue;
  }
}

const navigationAdapter = new NavigationAdapter();

export default navigationAdapter;
