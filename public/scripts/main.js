document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('start-button');
  const resultDiv = document.getElementById('result');

  button.addEventListener('click', () => {
    button.disabled = true;
    resultDiv.textContent = 'Testing...';

    $.ajax({
      url: 'https://www.speedtest.net/api/js/servers?engine=js',
      dataType: 'json',
      success: (servers) => {
        const closestServer = servers[0]; // Select the closest server for testing

        $.ajax({
          url: `https://www.speedtest.net/api/js/test?engine=js&upload=1&dummy=${Date.now()}`,
          dataType: 'json',
          success: (result) => {
            const downloadSpeed = result.download / 1024 / 1024; // Convert to Mbps
            const uploadSpeed = result.upload / 1024 / 1024; // Convert to Mbps

            resultDiv.innerHTML = `Download Speed: ${downloadSpeed.toFixed(2)} Mbps<br>`;
            resultDiv.innerHTML += `Upload Speed: ${uploadSpeed.toFixed(2)} Mbps`;

            button.disabled = false;
          },
          error: () => {
            resultDiv.textContent = 'An error occurred during the speed test.';
            button.disabled = false;
          }
        });
      },
      error: () => {
        resultDiv.textContent = 'An error occurred while retrieving server information.';
        button.disabled = false;
      }
    });
  });
});
