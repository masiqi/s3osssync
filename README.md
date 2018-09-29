# s3osssync
利用lambda自动同步s3上的文件到阿里云oss

主要是用来存储和服务静态文件，s3配合cloudfront为境外用户提供静态cdn，阿里云oss+阿里云cdn为境内用户提供服务  
需要配置以下环境变量：  
1. ALI_REGION  阿里云区域
2. ALI_KEYID   阿里云key
3. ALI_KEYSECRET  阿里云secret
4. ALI_BUCKET  阿里云桶名称
5. S3_PREFIX   S3前缀
