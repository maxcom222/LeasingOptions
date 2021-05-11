<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						padding:5%;
						font-family: Verdana, Arial, Helvetica, sans-serif;
						font-size: 12px;
					}


					table {
						width: 90%;
						float:left;
						margin:0% 0% 0% 5%;
					}

					th {
						text-align: left;
						border-bottom: 1px solid #aaaaaa;
						padding-bottom: 10px; padding-left: 5px;
					}

					tr.odd {
						background-color: #f7f7f7;
					}

					td {
						padding: 5px;
					}
				</style>
			</head>
			<body>
				<h1>Sitemap</h1>

				<div id="content">
					<table cellpadding="0" cellspacing="0">
						<tr>
              <th>URL</th>
                <th>Last Modified (GMT)</th>
                <th>Change Frequency</th>
                <th>Priority</th>							
						</tr>						
	<xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'" /> 
	<xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" /> 
											<xsl:for-each select="sitemap:urlset/sitemap:url">
							<tr>
								<xsl:if test="position() mod 2 != 0">
									<xsl:attribute name="class">odd</xsl:attribute>
								</xsl:if>
                <xsl:if test="position() mod 2 != 1">
                <xsl:attribute name="class">high</xsl:attribute> 
                </xsl:if>
								<td>
                    <xsl:variable name="itemURL">
                    <xsl:value-of select="sitemap:loc" /> 
                    </xsl:variable>
                    <a href="{$itemURL}">
                    <xsl:value-of select="sitemap:loc" /> 
                    </a>
								</td>
                      <td>
                      <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))" /> 
                      </td>
                      <td>
                      <xsl:value-of select="concat(translate(substring(sitemap:changefreq, 1, 1),concat($lower, $upper),concat($upper, $lower)),substring(sitemap:changefreq, 2))" /> 
                      </td>
                      <td>
                      <xsl:value-of select="concat(sitemap:priority*100,'%')" /> 
                      </td>
							</tr>
						</xsl:for-each>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>