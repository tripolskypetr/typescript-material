/// <reference path="./components/Counter.tsx"/>
namespace Material {

  const {h, render} = preact;

  render(<Counter/>, document.body, document.body.lastChild as HTMLElement);

}
