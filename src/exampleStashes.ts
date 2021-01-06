// import exampleScript from "@/exampleScript.json";
// import exampleSelectedData from "@/exampleSelectedData.json";
// import exampleDataPaths from "@/exampleDataPaths.json";

export default [
  {
    name: "Spotify",
    logoIcon: "la-spotify",
    importantColor: "#1DB954",
    enabled: true,
    globalScript: true,
    data: [],
    selectedData: {
      me: [
        {
          label: "Kraj",
          detail: "country",
          important: false,
          enabled: true,
        },
        {
          label: "Nazwa",
          detail: "display_name",
          important: false,
          enabled: true,
        },
        {
          label: "Email",
          detail: "email",
          important: false,
          enabled: true,
        },
        {
          label: "Followers",
          detail: "followers.total",
          important: true,
          enabled: true,
        },
        {
          label: "Typ konta",
          detail: "product",
          important: true,
          enabled: true,
          matchers: { premium: "Premium" },
        },
      ],
    },
    authCodes: {
      accessToken: null,
      tokenType: null,
      expiresIn: null,
    },
    vars: {
      authorize_uri: "https://accounts.spotify.com/authorize",
      redirect_uri: "http://localhost:8080/authorize/spotify",
      token_endpoint_uri: "https://accounts.spotify.com/api/token",
      client_id: "",
      client_secret: "",
      data_paths: {
        me: "https://api.spotify.com/v1/me",
      },
      scope: "user-read-private user-read-email",
    },
    script: {
      name: "Spotify",
      vars: {
        state: "{{ @randomWord }}",
      },
      tasks: {
        authenticateService: {
          description:
            "Generate URL and open browser - Service will redirect user and we will get access token",
          steps: [
            {
              action: "generateAuthenticationURI",
              description: "Generate authentication url with passed data",
              params: {
                authorize_uri: "{{ $authorize_uri }}",
                scope: "{{ $scope }}",
                redirect_uri: "{{ $redirect_uri }}",
                client_id: "{{ $client_id }}",
                state: "{{ $state }}",
                response_type: "token",
              },
              return: "{{ $$value }}",
            },
            {
              action: "redirect",
              description: "Open browser with url from previous step",
              params: {
                url: "{{ $$parent }}",
              },
            },
          ],
        },
        requestTokens: {
          description: "Send form to service and then save received tokens",
          steps: [
            {
              action: "sendForm",
              description: "Send request to service using POST method",
              params: {
                url: "{{ $token_endpoint_uri }}",
                authorization:
                  "{{ @createBasicToken $client_id $client_secret }}",
                body: {
                  grant_type: "authorization_code",
                  code: "{{ @readStashAuthCodes $$serviceName 'code' }}",
                  redirect_uri: "{{ $redirect_uri }}",
                  scope: "{{ $scope }}",
                },
              },
              return: {
                access_token: "{{ $$value.access_token }}",
                refresh_token: "{{ $$value.refresh_token }}",
                token_type: "{{ $$value.token_type }}",
                expires_in: "{{ $$value.expires_in }}",
                received_token_time: "{{ @dateNow }}",
              },
            },
            {
              action: "saveStashAuthCodes",
              description: "Save received data in store",
              params: {
                data: "{{ $$parent }}",
              },
            },
          ],
        },
        requestData: {
          description: "Request data from service",
          steps: [
            {
              action: "sendGetPaths",
              description: "Request user data",
              params: {
                paths: "{{ $data_paths }}",
                access_token:
                  "{{ @readStashAuthCodes $$serviceName 'accessToken' }}",
                token_type:
                  "{{ @readStashAuthCodes $$serviceName 'tokenType' }}",
              },
              return: "{{ $$value }}",
            },
            {
              action: "selectData",
              description: "Select data",
              params: {
                paths: "{{ $data_paths }}",
                selectedData: "{{ @readStash $$serviceName 'selectedData' }}",
              },
              return: "{{ $$value }}",
            },
            {
              action: "updateStash",
              description: "Save received data in store",
              params: {
                data: "{{ $$parent }}",
              },
            },
          ],
        },
      },
    },
  },
  {
    name: "Discord",
    logoIcon: "la-discord",
    importantColor: "#7686CA",
    enabled: true,
    globalScript: true,
    data: [],
    selectedData: {
      "@me": [
        {
          label: "Nazwa",
          detail: "username",
          important: false,
        },
        {
          label: "Email",
          detail: "email",
          important: false,
        },
        {
          label: "#ID",
          detail: "discriminator",
          important: true,
        },
        {
          label: "Zweryfikowany",
          detail: "verified",
          important: true,
        },
        {
          label: "Weryfikacja 2FA",
          detail: "mfa_enabled",
          important: true,
          matchers: {
            true: "Włączona",
            false: "Wyłączona",
          },
        },
      ],
      "@me/guilds": [
        {
          label: "Serwery",
          detail: "name",
          important: false,
          collect: true,
          limit: 3,
        },
      ],
    },
    vars: {
      authorize_uri: "https://discordapp.com/api/oauth2/authorize",
      redirect_uri: "http://localhost:8080/authorize/discord",
      token_endpoint_uri: "https://discordapp.com/api/oauth2/token",
      client_id: "",
      client_secret: "",
      scope: "identify email guilds",
      data_paths: {
        "@me": "https://discordapp.com/api/users/@me",
        "@me/guilds": "https://discordapp.com/api/users/@me/guilds",
      },
    },
    authCodes: {
      accessToken: null,
      tokenType: null,
      expiresIn: null,
    },
    script: {
      name: "Discord",
      vars: {
        state: "{{ @randomWord }}",
      },
      tasks: {
        authenticateService: {
          description: "Generate URL and open browser",
          steps: [
            {
              action: "generateAuthenticationURI",
              description: "Generate authentication url with passed data",
              params: {
                authorize_uri: "{{ $authorize_uri }}",
                scope: "{{ $scope }}",
                redirect_uri: "{{ $redirect_uri }}",
                client_id: "{{ $client_id }}",
                state: "{{ $state }}",
                response_type: "token",
              },
              return: "{{ $$value }}",
            },
            {
              action: "redirect",
              description: "Open browser with url from previous step",
              params: {
                url: "{{ $$parent }}",
              },
            },
          ],
        },
        requestTokens: {
          description: "Send form to service and then save received tokens",
          steps: [
            {
              action: "sendForm",
              description: "Send request to service using POST method",
              params: {
                url: "{{ $token_endpoint_uri }}",
                authorization:
                  "{{ @createBasicToken $client_id $client_secret }}",
                body: {
                  grant_type: "authorization_code",
                  code: "{{ @readStashAuthCodes $$serviceName 'code' }}",
                  redirect_uri: "{{ $redirect_uri }}",
                  scope: "{{ $scope }}",
                },
              },
              return: {
                access_token: "{{ $$value.access_token }}",
                refresh_token: "{{ $$value.refresh_token }}",
                token_type: "{{ $$value.token_type }}",
                expires_in: "{{ $$value.expires_in }}",
                received_token_time: "{{ @dateNow }}",
              },
            },
            {
              action: "saveStashAuthCodes",
              description: "Save received data in store",
              params: {
                data: "{{ $$parent }}",
              },
            },
          ],
        },
        requestData: {
          description: "Request data from service",
          steps: [
            {
              action: "sendGetPaths",
              description: "Request user data",
              params: {
                paths: "{{ $data_paths }}",
                access_token:
                  "{{ @readStashAuthCodes $$serviceName 'accessToken' }}",
                token_type:
                  "{{ @readStashAuthCodes $$serviceName 'tokenType' }}",
              },
              return: "{{ $$value }}",
            },
            {
              action: "selectData",
              description: "Select data",
              params: {
                paths: "{{ $data_paths }}",
                selectedData: "{{ @readStash $$serviceName 'selectedData' }}",
              },
              return: "{{ $$value }}",
            },
            {
              action: "updateStash",
              description: "Save received data in store",
              params: {
                data: "{{ $$parent }}",
              },
            },
          ],
        },
      },
    },
  },
];
