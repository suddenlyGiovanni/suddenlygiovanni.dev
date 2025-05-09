{
  description = "`suddenlygiovanni.dev` darwin development environment";

  # Flake inputs
  inputs.nixpkgs.url = "nixpkgs/nixpkgs-unstable";

  # Flake outputs
  outputs = { self, nixpkgs }:
    let
      system = "aarch64-darwin";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShells.aarch64-darwin.default = pkgs.mkShell {
        # The Nix packages provided in the environment
        # Add any you need here
        packages = with pkgs; [
          nodejs-slim_24
          corepack_24
          biome
        ];

        # Set any environment variables for your dev shell
        env = { };

        # Add any shell logic you want executed any time the environment is activated
        shellHook = ''
          echo "Nix dev env!"
          echo "Node version: $(node --version)"
          echo "Biome version: $(biome --version)"
          echo "Corepack version: $(corepack --version)"
          echo "pnpm version: $(pnpm -v)"
        '';
      };
    };
}
