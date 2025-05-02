# Supported URL Patterns

Below are the supported URL patterns (not 100% battle tested):

1. [Steven Black hosts](https://github.com/StevenBlack/hosts)
   - `0.0.0.0<whitespace character><url>`
2. Exact URLs
   - `http[s]://<subdomain><url>.<tld>`
3. Wildcard URLs, including known paths.
   - `<url>/*`
   - `<url>/<known path>/*`
4. URLs without protocol
   - `<subdomain>.<url>.<tld>`
5. URLs without subdomain
   - `http[s]://<url>.<tld>`
6. Partial keyword URLs
   - `<url>/[<keyword>, <...>]`

## Examples
