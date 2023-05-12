# Products Vanilla
This is a simple website that displays a list of products. The website is built using pure HTML and JavaScript.

[Sample live site](http://ec2-54-159-17-173.compute-1.amazonaws.com/products-vanila/html/login.html)


## Running the website locally
To run the website locally, follow these steps:

1. Clone the repository to your local machine:
```bash 
https://github.com/YoelEigner/products-vanila.git
```
2. Open the `login.html` file in your web browser.
That's it! The website should now be running locally on your machine.

## Deploying the website to an Apache server
To deploy the website to an Apache server, follow these steps:

1. Upload the files to your Apache server. You can use an FTP client such as FileZilla to upload the files.

2. Set the document root of your Apache server to the products-vanila directory. You can do this by modifying the DocumentRoot directive in the Apache configuration file.

```bash
DocumentRoot /path/to/products-vanila 
```
3. Restart Apache to apply the changes.

```bash 
sudo systemctl restart apache2
```
4. Access the website using your server's IP address or domain name.

That's it! The website should now be deployed and accessible on your Apache server.

## Contributing
If you would like to contribute to this project, feel free to submit a pull request or open an issue.

## License
This project is licensed under the MIT License. See the LICENSE file for details.