declare function nat(): void;

declare namespace nat {  

  export function init(): void;
  export function convert(inp?: string): string;

}

export = nat;
