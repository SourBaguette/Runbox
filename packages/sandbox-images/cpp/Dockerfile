FROM gcc:13

RUN useradd -m -u 1001 runner 

# bake the entrypoint script into the image
COPY entrypoint.sh /entrypoint.sh
# Make the script executable
RUN chmod +x /entrypoint.sh

WORKDIR /sandbox
USER runner 

ENTRYPOINT [ "/entrypoint.sh" ]