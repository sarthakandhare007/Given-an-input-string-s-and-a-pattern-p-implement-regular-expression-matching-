var isMatch = function(s, p) {
    const n = s.length;
    const m = p.length;

    // Create DP table
    const dp = Array.from({ length: n + 1 }, () =>
        Array(m + 1).fill(false)
    );

    dp[0][0] = true; // empty string matches empty pattern

    // Handle patterns like a*, a*b*, a*b*c*
    for (let j = 1; j <= m; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {

            // If characters match or pattern has '.'
            if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
                dp[i][j] = dp[i - 1][j - 1];
            }

            // If pattern has '*'
            else if (p[j - 1] === '*') {

                // Case 1: Zero occurrences of preceding char
                dp[i][j] = dp[i][j - 2];

                // Case 2: One or more occurrences
                if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }

    return dp[n][m];
};
