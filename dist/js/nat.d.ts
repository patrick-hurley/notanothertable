declare function nat(): void;

declare namespace nat {  

  export function init(): void;
  export function convert(inp?: string): { display: string; hasError: boolean, errorString: string; };

}

export = nat;