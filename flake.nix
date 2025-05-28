{
  # Flake inputs
  inputs.nixpkgs.url = "nixpkgs/nixpkgs-unstable";

  # Flake outputs
  outputs = { nixpkgs, ... }:
    let
      forAllSystems =
        function:
        nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed (
            system: function nixpkgs.legacyPackages.${system}
        );
    in
    {

      devShells = forAllSystems (pkgs: {
       default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs-slim_24
          corepack_24
          biome
        ];
        env = { };
        shellHook = ''
          echo "Nix dev env!"
          echo "Node version: $(node --version)"
          echo "Biome version: $(biome --version)"
          echo "Corepack version: $(corepack --version)"
          echo "pnpm version: $(pnpm -v)"
        '';
       };

      });
    };
}
